const chai = require("chai");
const desugarJoins = require("../../src/transform/desugarJoins");
const utl = require("./utl");

const expect = chai.expect;

describe("transform/desugarJoins", () => {
  it("leaves empty state machines alone", () => {
    const EMPTY_MACHINE = { states: [] };
    expect(desugarJoins(EMPTY_MACHINE)).to.deep.equal(EMPTY_MACHINE);
  });

  it("leaves state machines without joins alone", () => {
    const JOINLESS = utl.readFixture("noforknojoin.json");
    expect(desugarJoins(JOINLESS)).to.deep.equal(JOINLESS);
  });

  it("replaces joins with the transitions they represent", () => {
    const WITHJOIN = utl.readFixture("singlejoin.json");
    const WITHOUTJOIN = utl.readFixture("singlejoin.desugared.json");
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });

  it("replaces joins in nested sms' with the transitions they represent", () => {
    const WITHJOIN = utl.readFixture("singlenestedjoin.json");
    const WITHOUTJOIN = utl.readFixture("singlenestedjoin.desugared.json");
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });

  it("replaces joins to sm's with the transitions they represent", () => {
    const WITHJOIN = utl.readFixture("joinintonested.json");
    const WITHOUTJOIN = utl.readFixture("joinintonested.desugared.json");
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });

  it("replaces joins to highr up sm's with the transitions they represent", () => {
    const WITHJOIN = utl.readFixture("joinfromnestedtohigherup.json");
    const WITHOUTJOIN = utl.readFixture(
      "joinfromnestedtohigherup.desugared.json"
    );
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });

  it("merges incoming and outgoing actions", () => {
    const WITHJOIN = utl.readFixture("joinmergeactions.json");
    const WITHOUTJOIN = utl.readFixture("joinmergeactions.desugared.json");
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });

  it("uses the outgoing action if there's no incoming one", () => {
    const WITHJOIN = utl.readFixture("joinuseoutgoingaction.json");
    const WITHOUTJOIN = utl.readFixture("joinuseoutgoingaction.desugared.json");
    expect(desugarJoins(WITHJOIN)).to.deep.equal(WITHOUTJOIN);
  });
});