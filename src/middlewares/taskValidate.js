const validateBody = (req, res, next) => {

    const { body } = req;

    if(body.title === undefined){
        // tempo 1.20.49
        // https://www.youtube.com/watch?v=Cdu0WJhI-d8&t=697s

    }

    console.log('aqui dfdf')

}

module.exports = {
    validateBody
};