import createUser from "./scenarios/user/createUser.js";
import createPet from "./scenarios/pet/createPet.js";
import placeOrder from "./scenarios/store/placeOrder.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group, sleep } from "k6";

export const options = {
    scenarios:{
        // pet: {
        //     executor: 'ramping-vus',
        //     exec: 'pet',
        //     stages: [
        //         { duration: '30s', target: 20 },
        //         { duration: '1m', target: 20 },
        //         { duration: '30s', target: 0 },
        //     ],

        // },

        // store: {
        //     executor: 'ramping-vus',
        //     exec: 'store',
        //     stages: [
        //         { duration: '20s', target: 10 },
        //         { duration: '40s', target: 10 },
        //         { duration: '20s', target: 0 },
        //     ],

        // },

        user: {
            executor: 'constant-vus',
            exec: 'user',
            vus: 5,
            duration: '30s'
            // stages: [
            //     { duration: '30s', target: 4 },
            //     { duration: '30s', target: 4 },
            //     { duration: '30s', target: 0 },
            // ],

        },

    },
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
      },
};

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

// export function pet() {
//     group("Pet Endpoint - Create Pet API", () => {
//         createPet();
//     })

//     sleep(1);
// }

// export function store() {
//     group("Store Endpoint - Place an order for a pet API", () => {
//         placeOrder();
//     })

//     sleep(1);
// }

export function user() {
    group("User Endpoint - Create User API", () => {
        createUser();
    })

    sleep(1);
}




