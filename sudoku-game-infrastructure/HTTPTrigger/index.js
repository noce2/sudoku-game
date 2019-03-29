module.exports = async function generateNewGrid (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Hello " + "Here is your grid"
    };
    context.done();
};