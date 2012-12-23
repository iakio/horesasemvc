describe("MeigenController", function () {
  var scope = {},
    ctrl,
    meigens,
    sampler;

  beforeEach(function () {
    meigens = [
      "one",
      "two",
      "three",
      "four",
      ];
    sampler = {
      sample: function (arr) { return arr.slice(0, 3); }
    };
    ctrl = new MeigenController(scope, meigens, sampler);
  });

  it("should create with 3 samples", function () {
    expect(scope.sample.length).toBe(3);
  });


});
