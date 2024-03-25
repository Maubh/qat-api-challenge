import createUser from "./scenarios/user/createUser.js";
import createPet from "./scenarios/pet/createPet.js";
import placeOrder from "./scenarios/store/placeOrder.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group, sleep } from "k6";

export const options = {
    scenarios:{
        pet: {
            executor: 'ramping-vus',
            exec: 'pet',
            stages: [
                { duration: '30s', target: 20 }, // Ramp up to 20 users over 30 seconds
                { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
                { duration: '30s', target: 0 },  // Ramp down to 0 users over 30 seconds
            ],

        },

        store: {

            executor: 'ramping-vus',
            exec: 'store',
            stages: [
                { duration: '20s', target: 10 }, // Ramp up to 10 users over 20 seconds
                { duration: '40s', target: 10 }, // Hold at 10 users for 40 seconds
                { duration: '20s', target: 0 },  // Ramp down to 0 users over 20 seconds
            ],

        },

        user: {
            executor: 'ramping-vus',
            exec: 'user',
            stages: [
               { duration: '1m', target: 50 }, // Ramp up to 50 users over 1 minute
               { duration: '2m', target: 50 }, // Stay at 50 users for 2 minutes
               { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
            ],

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

export function pet() {
    group("Pet Endpoint - Create Pet API", () => {
        createPet();
    })

    sleep(1);
}

export function store() {
    group("Store Endpoint - Place an order for a pet API", () => {
        placeOrder();
    })

    sleep(1);
}

export function user() {
    group("User Endpoint - Create User API", () => {
        createUser();
    })

    sleep(1);
}




