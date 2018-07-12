const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server').default.default;
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}];



beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });


    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send('')
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });


    it('should return a 404 if todo not found', (done) => {
        //make sure you get a 404 back
        request(app)
        .get(`/todos/3${todos[0]._id.toHexString().substring(1)}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non ObjectIDs', (done) => {
        //todos/123
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        }).end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        });

    });

    it('should remove 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/3${todos[0]._id.toHexString().substring(1)}`)
        .expect(404)
        .end(done);

    })

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });
});


describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        // grab id of first item
        // update text, set completed true
        // 200
        // text is changed, completed is true, completedAt is a number 
        let hexId = todos[0]._id.toHexString();
        let newText = "Something else after test 1";
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text: newText,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(newText);
                expect(todo.completed).toBe(true);
                expect(typeof todo.completedAt).toBe('number');
                done();
            });
        });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item 
        //update text, set completed to false
        //200
        // text is changed , completed false, completed is null
        let hexId = todos[1]._id.toHexString();
        let newText = "Something else after test 2";
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text: newText,
            completed: false
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(newText);
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toBeNull();
            });
            done();
        });
    });
});