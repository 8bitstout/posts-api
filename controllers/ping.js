const get = (req, res) => {
    res
        .status(200)
        .json({
            success: true
        });
};

const PingController = (app, router) => {
    router.get('/', get);

    app.use('/ping', router);
};

module.exports = { PingController, get };
