let config = {
    // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
    // height: "11in", // allowed units: mm, cm, in, px
    // width: "8.6in", // allowed units: mm, cm, in, px
    height: "300mm",
    width: "80mm", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    orientation: "landscape", // portrait or landscape
    border: {
        top: "0.1cm", // default is 0, units: mm, cm, in, px
        right: "0.1cm",
        bottom: "0.1cm",
        left: "0.1cm",
    },
};

module.exports= config;