import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100}, // ramp up to 100 users over 2 minutes
        { duration: '3m', target: 100}, // stay at 100 users for 3 minutes
        { duration: '2m', target: 0}, // Ramp down to 0 users over 2 minutes

    ]
}

export default function () {
    let response = http.post('http://localhost:8080/api/v3/pet', JSON.stringify({
        id: 11,
        name: 'Albert',
        status: 'pending'

    }), {
        headers: { 'Content-Type': 'application/json'},
    });

    check(response, { 'is status 200': (r) => r.status === 200});
    sleep(1);
}
