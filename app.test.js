const request = require('supertest');
const app = require('./app');

describe('Assignment Submission Portal Tests', () => {
    
    // Test Case 1
    it('Complete details and a valid submission URL', async () => {
        const res = await request(app)
            .post('/submit')
            .send({
                name: "John Doe",
                regNo: "FA20-BCS-001",
                title: "DevOps Lab Mid",
                url: "https://github.com/johndoe/repo"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Submission saved");
    });

    // Test Case 2
    it('Missing registration number', async () => {
        const res = await request(app)
            .post('/submit')
            .send({
                name: "John Doe",
                title: "DevOps Lab Mid",
                url: "https://github.com/johndoe/repo"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toContain("Missing required fields");
    });

    // Test Case 3
    it('Invalid submission URL', async () => {
        const res = await request(app)
            .post('/submit')
            .send({
                name: "John Doe",
                regNo: "FA20-BCS-001",
                title: "DevOps Lab Mid",
                url: "not-a-valid-url"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("Invalid submission URL.");
    });
});