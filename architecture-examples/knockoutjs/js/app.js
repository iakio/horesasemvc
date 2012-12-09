

function Meigen(obj) {
    _.extend(this, obj);
}

Meigen.prototype.entryUrl = function () {
    return "http://jigokuno.com/?eid=" + this.eid;
};

Meigen.prototype.copy = function () {
    // TODO
};

function AppViewModel() {
    var root = this;

    this.query = ko.observable("");
    this.character = ko.observable("");

    this.resetQuery = function () {
        root.query("");
    };

    this.selectCharacter = function (data) {
        root.character(data.character);
    };

    this.resetCharacter = function () {
        root.character("");
    };

    this.isSearchWorking = ko.computed(function () {
        return root.query() !== "" || root.character() !== "";
    });

    this.sample = ko.observable([]);

    this.refresh = function () {
        root.query("")
            .character("")
            .sample(
                _.chain(window.meigens)
                    .shuffle()
                    .first(3)
                    .map(function (obj) { return new Meigen(obj); })
                    .value()
            );
    };

    this.meigens = ko.computed(function () {
        var character = root.character(),
            query = root.query();

        if (root.isSearchWorking()) {
            return _.chain(window.meigens)
                .select(function (obj) { return !character || obj.character == character; })
                .select(function (obj) {
                    return !query ||
                        _.any([ 'title', 'character', 'body' ], function (prop) {
                            return obj[prop].indexOf(query) >= 0;

                        });
                })
                .map(function (obj) { return new Meigen(obj); })
                .value();
        } else {
            return root.sample();
        }
    });

    this.hits = ko.computed(function () {
        return root.meigens().length;
    });

    this.notFound = ko.computed(function () {
        return root.meigens().length === 0;
    });


    this.refresh();
};

app = new AppViewModel();
$(function () {
    ko.applyBindings(app);
});
