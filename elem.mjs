export const valid_spec = /^([a-z](?:[a-z-]*[a-z])?)(?:\.([-a-z_][-a-z0-9_]*(?:\.[-a-z_][-a-z0-9_]*)*))?(?:#([a-z][-_:a-z0-9.]*))?$/i;
export const elem = make(globalDocument() || createDocument());

export function make(document) {
    return Object.assign(elem, {document});

    function elem(spec, text, children) {
        if (text && !children && isIterable(text) && typeof text !== "string") {
            [text, children] = [undefined, text];
        }

        if (spec && typeof spec.createElement === "function") return make(spec);

        const match = valid_spec.exec(spec);

        if (!match) throw new Error(`invalid element spec '${spec}'`);

        const [_, name, classes, id] = match;
        const element = elem.document.createElement(name);

        if (classes) classes.split(".").forEach(c => element.classList.add(c));
        if (id) element.id = id;
        if (text) element.innerText = text;
        if (children) for (const child of children) element.appendChild(child);

        return element;
    }
}

function createDocument() {
    return {createElement() {}};
}

function globalDocument() {
    const {document} = (0,eval)("this");
    return document;
}

function isIterable(object) {
    return Boolean(object && typeof object[Symbol.iterator] === "function");
}
