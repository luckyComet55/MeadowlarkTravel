const handlers = require("../handlers.js");
const main = require("../handlers/main");

test("Home page renders", () => {
    const req = {};
    const res = { render: jest.fn() };
    main.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("home");
})

test("About page renders", () => {
    const req = {};
    const res = { render: jest.fn() };
    main.about(req, res);
    expect(res.render.mock.calls[0][0]).toBe("about");
})

test("About page includes fortune", () => {
    const req = {};
    const res = { render: jest.fn() };
    main.about(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({
        fortune: expect.stringMatching(/\w/)
    }));
})

test("404 page working", () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.notFound(req, res);
    expect(res.render.mock.calls[0][0]).toBe("404");
})

test("500 page working", () => {
    const err = new Error("Test Error");
    const req = {};
    const res = { render: jest.fn() };
    const next = jest.fn();
    handlers.serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("500");
})