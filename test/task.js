const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//asseration style
chai.should();

chai.use(chaiHttp);

describe("Task API ", () => {
  //Test the GET route
  describe("GET /api/v1/tasks", () => {
    it("It should GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/v1/tasks")
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should Not GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/v1/task")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  //Test the GET (by id) route
  describe("GET /api/v1/task/:id", () => {
    it("It should GET task by Id ", (done) => {
      const taskId = 1;
      chai
        .request(server)
        .get(`/api/v1/task/${taskId}`)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("completed");
          res.body.should.have.property("id").eq(1);
          done();
        });
    });

    it("It should Not GET task by Id ", (done) => {
      const taskId = 1456;
      chai
        .request(server)
        .get(`/api/v1/task/${taskId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The Task With Provided Id doesnot exits");
          done();
        });
    });
  });

  //Test The Post Route
  describe("POST /api/v1/newTask", () => {
    it("It should POST New task ", (done) => {
      const task = {
        id: 4,
        name: "Task 4",
        completed: true,
      };
      chai
        .request(server)
        .post(`/api/v1/newTask/`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eq(4);
          res.body.should.have.property("name").eq("Task 4");
          res.body.should.have.property("completed").eq(true);

          done();
        });
    });

    it("It should Not Post New task ", (done) => {
      const task = {
        completed: true,
      };
      chai
        .request(server)
        .post(`/api/v1/newTask/`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq("the bad request for task ");
          done();
        });
    });
  });

  //Test Put route

  describe("PUT /api/v1/task/:id", () => {
    it("It should Update a task ", (done) => {
      const taskId = 4;
      const task = {
        name: "Task 4 changed",
        completed: false,
      };
      chai
        .request(server)
        .put(`/api/v1/task/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eq(4);
          res.body.should.have.property("name").eq("Task 4 changed");
          res.body.should.have.property("completed").eq(false);

          done();
        });
    });

    it("It should Not Update a task ", (done) => {
      const task = {
        name: "Ta",
        completed: false,
      };
      const taskId = 123;
      chai
        .request(server)
        .put(`/api/v1/task/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("there is no task with provided id");
          done();
        });
    });
  });

  //Test Delete route

  describe("Delete /api/v1/newTask", () => {
    it("It should Delete a task ", (done) => {
      const taskId = 4;

      chai
        .request(server)
        .delete(`/api/v1/task/${taskId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("id").eq(4);
          res.body.should.have.property("name").eq("Task 4 changed");
          res.body.should.have.property("completed").eq(false);

          done();
        });
    });

    it("It should Not Delete a task ", (done) => {
      const taskId = 123;
      chai
        .request(server)
        .delete(`/api/v1/task/:${taskId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq(`there is no task with provided id`);
          done();
        });
    });
  });
});
