const { request } = require('@ytton/tools');
module.exports = request.create({
  baseURL: 'http://localhost:3000',
  handleResponse(res) {
    res = res.data;
  }
});
