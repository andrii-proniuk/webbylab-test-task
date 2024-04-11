class BaseHttpException extends Error {
  #status;

  #body;

  constructor(status, body) {
    super();

    this.#status = status;
    this.#body = body;
  }

  getStatus() {
    return this.#status;
  }

  getBody() {
    return this.#body;
  }
}

module.exports = { BaseHttpException };
