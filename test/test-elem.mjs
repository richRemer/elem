import expect from "expect.js";
import sinon from "sinon";
import {elem, make} from "../elem.mjs";

describe("make(Document)", () => {
    let document;

    beforeEach(() => {
        document = createDocument();
    });

    it("should return 'elem' function", () => {
        expect(make(document)).to.be.a("function");
        expect(make(document).name).to.be("elem");
        expect(make(document).length).to.be(3);
    });

    it("should bind function to document", () => {
        expect(make(document).document).to.be(document);
    });

    it("should return new function each time", () => {
        expect(make(document)).to.not.be(make(document));
    });
});

describe("elem(string)", () => {
    let elem;

    beforeEach(() => {
        elem = make(createDocument());
    });

    it("should error on invalid spec", () => {
        expect(() => elem(".foo")).to.throwError();
        expect(() => elem("#foo")).to.throwError();
        expect(() => elem("foo..bar")).to.throwError();
        expect(() => elem("foo.#bar")).to.throwError();
        expect(() => elem("foo#bar#baz")).to.throwError();
    });

    it("should create element by name", () => {
        const {document} = elem;
        const element = elem("foo");

        expect(document.createElement.calledOnce).to.be(true);
        expect(document.createElement.calledWith("foo")).to.be(true);
    });

    it("should add classes to element", () => {
        const element = elem("foo.bar.baz");

        expect(element.classList.add.calledTwice).to.be(true);
        expect(element.classList.add.calledWith("bar")).to.be(true);
        expect(element.classList.add.calledWith("baz")).to.be(true);
    });

    it("should set id of element", () => {
        const element = elem("foo#bar");
        expect(element.id).to.be("bar");
    });
});

describe("elem(string, string)", () => {
    let elem;

    beforeEach(() => {
        elem = make(createDocument());
    });

    it("should set innerText", () => {
        const text = "Muhammad Li";
        const element = elem("span.name", text);
        expect(element.innerText).to.be(text);
    });
});

describe("elem(string, DOMElement[])", () => {
    let elem;

    beforeEach(() => {
        elem = make(createDocument());
    });

    it("should add child elements", () => {
        const fname = elem("span.first.name", "Muhammad");
        const lname = elem("span.last.name", "Li");
        const element = elem("div.container#foo", [fname, lname]);

        expect(element.appendChild.calledTwice).to.be(true);
        expect(element.appendChild.calledWith(fname)).to.be(true);
        expect(element.appendChild.calledWith(lname)).to.be(true);
    });
});

describe("elem(string, string, DOMElement[])", () => {
    let elem;

    beforeEach(() => {
        elem = make(createDocument());
    });

    it("should set innerText", () => {
        const text = "Muhammad Li";
        const element = elem("span.name", text);
        expect(element.innerText).to.be(text);
    });

    it("should add child elements", () => {
        const fname = elem("span.first.name", "Muhammad");
        const lname = elem("span.last.name", "Li");
        const element = elem("div.container#foo", [fname, lname]);

        expect(element.appendChild.calledTwice).to.be(true);
        expect(element.appendChild.calledWith(fname)).to.be(true);
        expect(element.appendChild.calledWith(lname)).to.be(true);
    });
});

function createDocument() {
    return sinon.spy({
        createElement(name) {
            const appendChild = sinon.spy(() => {});
            const classList = sinon.spy({
                add(className) {}
            });

            return {name, classList, appendChild};
        }
    });
}

function createClassList() {
    const classes = new Set();

    return sinon.spy({
        add(className)      { classes.add(className); },
        remove(className)   { classes.delete(className); }
    });
}
