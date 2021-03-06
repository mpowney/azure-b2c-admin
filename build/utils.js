const createNotifierCallback = () => {
    const notifier = require("node-notifier");

    return (severity, errors) => {
        if (severity !== "error") return;

        const error = errors[0];
        const filename = error.file && error.file.split("!").pop();

        notifier.notify({
            title: 'lowrez-music-finder', /* packageConfig.name, */
            message: severity + ": " + error.name,
            subtitle: filename || "",
            icon: 'alert.png' /*path.join(__dirname, "alert.png") */
        });
    };
};

exports.createNotifierCallback = createNotifierCallback;
