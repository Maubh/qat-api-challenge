import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export default function () {
    const payload = JSON.stringify({
        id: randomIntBetween(1, 100),
        petId: randomIntBetween(1, 1000),
        quantity: randomIntBetween(1, 10),
        shipDate: '2024-01-01T09:00:00.000Z',
        status: 'available',
        complete: true,
    });

    const headers = {
        'Content-Type': 'application/json',
    };

    let res = http.post('http://localhost:8080/api/v3/store/order', payload, { headers });
    check(res, { 'is status 200': (r) => r.status === 200 });
    sleep(1);
}
