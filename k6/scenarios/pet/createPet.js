import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export default function () {
    const petStatuses = ['available', 'pending', 'sold'];
    const payload = JSON.stringify({
        id: randomIntBetween(1, 100),
        name: `Pet-${randomString(10)}`,
        category: {
          id: 1,
          name: "Cats"
        },
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "srd"
          }
        ],
        status: "available"
    });

    const headers = {
        'Content-Type': 'application/json',
    };

    let res = http.post('https://petstore3.swagger.io/api/v3/pet', payload, { headers });
    check(res, { 'is status 200': (r) => r.status === 200 });
    sleep(1);
}
