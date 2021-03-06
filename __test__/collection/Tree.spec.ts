import {expect} from "chai";
import {default as Tree} from "wasabi-common/lib/collection/Tree";

/* tslint:disable no-unused-expression */
describe("collection/Tree", () => {
    it("constructor", () => {
        let map = new Tree();
        expect(map.get()).to.be.deep.eq({});

        map = new Tree({});
        expect(map.get()).to.be.deep.eq({});

        const obj = {
            key1: {
                childOfKey1: "",
            },
            key2: "",
        };

        map = new Tree(obj);
        expect(map.get()).to.be.deep.eq(obj);
    });

    it("put & get", () => {
        const expectedValue = "test";
        const map = new Tree();
        map.put("key1", true);
        expect(map.get()).to.be.deep.eq({
            key1: true,
        });
        expect(map.get("key1")).to.be.deep.eq(true);

        map.put("key1.key2.key3", expectedValue);

        expect(map.get()).to.be.deep.eq({
            key1: {
                key2: {
                    key3: expectedValue,
                },
            },
        });

        expect(map.get("key1.key2.key3")).to.be.deep.eq(expectedValue);
        expect(map.get("key1", "key2.key3")).to.be.deep.eq(expectedValue);

        map.put("key2", null);
        expect(map.get("key2")).to.be.null;
        expect(map.get("key5")).to.be.undefined;

        map.put("key3", {
            key4: "example",
        });

        expect(map.get("key3", "key4")).to.be.eq("example");
    });

    it("putAll", () => {
        const map = new Tree();
        map.putAll({
            key1: true,
        });
        expect(map.get()).to.be.deep.eq({
            key1: true,
        });
        expect(map.get("key1")).to.be.deep.eq(true);

        const obj = {
            key1: {
                key2: {
                    key3: "example",
                },
            },
        };
        map.putAll(obj);
        expect(map.get()).to.be.deep.eq(obj);
        expect(map.get("key1.key2.key3")).to.be.deep.eq(obj.key1.key2.key3);
        expect(map.get("key1", "key2.key3")).to.be.deep.eq(obj.key1.key2.key3);
    });

    it("tree", () => {
        const map = new Tree();
        const obj = {
            key1: {
                key2: {
                    key3: "example",
                },
            },
        };
        map.putAll(obj);
        expect(map.tree("key1")).to.be.deep.eq(new Tree(obj.key1));
        expect(map.tree("key1.key2")).to.be.deep.eq(new Tree(obj.key1.key2));
    });

    it("remove", () => {
        const map = new Tree();
        const obj = {
            key1: {
                key2: {
                    key3: "example",
                },
            },
        };
        map.putAll(obj);
        expect(map.tree("key1")).to.be.deep.eq(new Tree(obj.key1));
        expect(map.remove("key1.key2")).to.be.true;
        expect(map.get()).to.be.deep.eq({
            key1: {},
        });
        expect(map.remove("key1.key2")).to.be.false;
        expect(map.remove("key1", "key2")).to.be.false;
        expect(map.remove("a")).to.be.false;
        expect(map.remove("key1")).to.be.true;
        expect(map.remove()).to.be.false;
    });

    it("clear", () => {
        const map = new Tree<string>();
        const obj = {
            key1: {
                key2: {
                    key3: "example",
                },
            },
        };
        map.putAll(obj);
        expect(map.tree("key1")).to.be.deep.eq(new Tree(obj.key1));
        map.clear();
        expect(map.get()).to.be.deep.eq({});
    });
});
