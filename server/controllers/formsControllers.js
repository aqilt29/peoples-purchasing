// import the forms model

module.exports = {
    getAllForms: (req, res) => {
        res.send('TODO API Create: get all forms: '+ JSON.stringify(req.params) + ' ' + req.path)
    },

    getFormById: (req, res) => {
        res.send('TODO API Create: get form by id: '+ JSON.stringify(req.params) + ' ' + req.path)
    },

    getFormsByUser: (req, res) => {
        res.send('TODO API Create: get forms by user: '+ JSON.stringify(req.params) + ' ' + req.path)
    },

    getFormsByStatus: (req, res) => {
        res.send('TODO API Create: get forms by status:' + JSON.stringify(req.params) + ' '+ req.path)
    },

    createForm: (req, res) => {
        res.send('TODO API Create: create form: '+ JSON.stringify(req.params) + ' ' + req.path)
    },

    updateForm: (req, res) => {
        res.send('TODO API UPDATE: update form: '+ JSON.stringify(req.params) + ' ' + req.path)
    },
}
