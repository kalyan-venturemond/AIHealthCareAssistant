import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock adapter set to delay responses by 500ms
const mock = new MockAdapter(axios, { delayResponse: 500 });
const API_URL = "http://localhost:8080";

console.log("Mock API initialized");

// Auth
mock.onPost(new RegExp(`${API_URL}/api/auth/signin`)).reply(200, {
  accessToken: "mock-token-123",
  username: "testuser",
  email: "testuser@example.com",
  roles: ["ROLE_USER", "ROLE_DOCTOR", "ROLE_ADMIN"],
  id: "625e9d9...", 
});

mock.onPost(new RegExp(`${API_URL}/api/auth/signup`)).reply(200, {
  message: "User registered successfully!"
});

mock.onPost(new RegExp(`${API_URL}/api/auth/signinlinkedin`)).reply(200, {
  accessToken: "mock-linkedin-token",
  username: "linkedinuser",
  roles: ["ROLE_USER"],
  id: "linkedin-id"
});

mock.onPost(new RegExp(`${API_URL}/api/auth/signinface`)).reply(200, {
  accessToken: "mock-face-token",
  username: "faceuser",
  roles: ["ROLE_USER"],
  id: "face-id"
});


// User Service
mock.onGet(new RegExp(`${API_URL}/api/test/all`)).reply(200, "Public Content");
mock.onGet(new RegExp(`${API_URL}/api/test/user`)).reply(200, "User Content");
mock.onGet(new RegExp(`${API_URL}/api/test/mod`)).reply(200, "Moderator Board");
mock.onGet(new RegExp(`${API_URL}/api/test/admin`)).reply(200, "Admin Board");

// Records
const mockRecords = [
    {
        _id: "record1",
        probActive: [
            { probleme: "Hypertension", date: "2023-01-15" },
            { probleme: "Diabetes Type 2", date: "2022-05-20" }
        ],
        allergie: [{}],
        medication: [{}],
        hereditary: [{}],
        active: "true"
    },
    {
        _id: "record2",
        probActive: [],
        allergie: [],
        medication: [],
        hereditary: [],
        active: "true"
    }
];

// Single Record (regex to match ID)
mock.onGet(new RegExp(`${API_URL}/records/.+`)).reply(200, [mockRecords[0]]);
// All Records
mock.onGet(new RegExp(`${API_URL}/records`)).reply(200, mockRecords);

mock.onPut(new RegExp(`${API_URL}/records/.*`)).reply(200, {});
mock.onDelete(new RegExp(`${API_URL}/records/.*`)).reply(200, {});


// Users
const mockUsers = [
    {
        _id: "user1",
        firstname: "John",
        lastname: "Doe",
        phone: "1234567890",
        email: "john@example.com",
        birthdate: "1990-01-01"
    },
    {
        _id: "user2",
        firstname: "Jane",
        lastname: "Smith",
        phone: "0987654321",
        email: "jane@example.com",
        birthdate: "1985-05-05"
    }
];

mock.onGet(new RegExp(`${API_URL}/users/users-patients/patient`)).reply(200, mockUsers);

// Doctor endpoints (generic fallback)
// If there are other endpoints like /blogs, /doctors etc, we should check.
// But a generic capture might be safer for "UI loads without error".

// Pass through requests that don't match (though we want to mock everything for Vercel/Frontend Only)
// Actually, default is to return 404 if not mocked.
// Let's add catch-all for GET/POST/PUT/DELETE to prevent crashes.

mock.onGet(/.*/).reply((config) => {
    console.warn("Unmocked GET request, returning generic success:", config.url);
    // return list for array expectations
    return [200, []]; 
});

mock.onPost(/.*/).reply((config) => {
    console.warn("Unmocked POST request, returning generic success:", config.url);
    return [200, {}];
});

mock.onPut(/.*/).reply((config) => {
    console.warn("Unmocked PUT request:", config.url);
    return [200, {}];
});

mock.onDelete(/.*/).reply((config) => {
    console.warn("Unmocked DELETE request:", config.url);
    return [200, {}];
});

export default mock;
