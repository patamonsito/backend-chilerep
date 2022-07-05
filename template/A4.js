let config = {
    // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
    // height: "11in", // allowed units: mm, cm, in, px
    // width: "8.6in", // allowed units: mm, cm, in, px
    format: "A4", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    orientation: "portrait", // portrait or landscape
    border: {
        top: "1cm", // default is 0, units: mm, cm, in, px
        right: "0.5cm",
        bottom: "0.5cm",
        left: "1cm",
    },
};

module.exports= config;