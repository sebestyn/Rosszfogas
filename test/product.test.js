const expect = require('chai').expect;
const cremoProductMW = require('../middlewares/product/cremoProductMW');
const deleteProductMW = require('../middlewares/product/deleteProductMW');
const findProductByIdMW = require('../middlewares/product/findProductByIdMW');
const loadAllProductsMW = require('../middlewares/product/loadAllProductsMW');

// Create objRepo before all tests
let objRepo = {};
let res = {};

describe('Product', () => {
    // Create objRepo before all tests
    before(() => {
        objRepo = {
            Product: {
                create: async (product) => {
                    return product;
                },
                updateOne: async (id, product) => {
                    return product;
                },
                findOne: async (select) => {
                    return {
                        ...select,
                        name: 'Test',
                        price: 1000,
                    };
                },
                deleteOne: async (id) => {
                    return {
                        _id: id,
                        name: 'Test',
                        price: 1000,
                    };
                },
                find: async (select) => {
                    return [
                        {
                            _id: '5f9e1b9b9b0b3e1e3c4b3b3b',
                            name: 'Test',
                            price: 1000,
                        },
                    ];
                },
            },
            Customer: {
                updateOne: async (select, update) => {
                    return update;
                },
            },
        };
        res = {
            locals: {},
        };
    });

    it('should return true', () => {
        expect(true).to.equal(true);
    });

    describe('cremoProductMW', () => {
        it('should return error message if name is empty', async () => {
            const req = {
                body: {
                    name: '',
                    price: 1000,
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikertelen! \nA név és az ár megadása kötelező!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = cremoProductMW(objRepo);
            await mw(req, res, next);
        });

        it('should return error message if price is empty', async () => {
            const req = {
                body: {
                    name: 'Test',
                    price: '',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikertelen! \nA név és az ár megadása kötelező!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = cremoProductMW(objRepo);
            await mw(req, res, next);
        });

        it('should create new product', async () => {
            const req = {
                body: {
                    name: 'Test',
                    price: 1000,
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikeres mentés!');
                expect(res.locals.msgType).to.equal('success');
            };
            const mw = cremoProductMW(objRepo);
            await mw(req, res, next);
        });

        it('should update product', async () => {
            const req = {
                params: {
                    id: 1,
                },
                body: {
                    name: 'Test',
                    price: 1000,
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikeres mentés!');
                expect(res.locals.msgType).to.equal('success');
            };
            const mw = cremoProductMW(objRepo);
            await mw(req, res, next);
        });
    });

    describe('deleteProductMW', () => {
        it('should return error message if id is empty', async () => {
            const req = {
                params: {
                    id: '',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikertelen!\nHiba történt a törlés során!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = deleteProductMW(objRepo);
            await mw(req, res, next);
        });

        it('should return error message if id is not valid', async () => {
            const req = {
                params: {
                    id: 'asd',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikertelen!\nHiba történt a törlés során!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = deleteProductMW(objRepo);
            await mw(req, res, next);
        });

        it('should delete product', async () => {
            const req = {
                params: {
                    id: '5f9e1b9b9b0b3e1e3c4b3b3b',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Sikeres törlés!');
                expect(res.locals.msgType).to.equal('success');
            };
            const mw = deleteProductMW(objRepo);
            await mw(req, res, next);
        });
    });

    describe('findProductByIdMW', () => {
        it('should return error message if id is empty', async () => {
            const req = {
                params: {
                    id: '',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Hibás termék azonosító!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = findProductByIdMW(objRepo);
            await mw(req, res, next);
        });

        it('should return error message if id is not valid', async () => {
            const req = {
                params: {
                    id: 'asd',
                },
            };

            const next = (err) => {
                expect(res.locals.msg).to.equal('Hibás termék azonosító!');
                expect(res.locals.msgType).to.equal('error');
            };
            const mw = findProductByIdMW(objRepo);
            await mw(req, res, next);
        });
        it('should return product', async () => {
            const req = {
                params: {
                    id: '5f9e1b9b9b0b3e1e3c4b3b3b',
                },
            };

            const next = (err) => {
                expect(res.locals.product).to.eql({
                    _id: '5f9e1b9b9b0b3e1e3c4b3b3b',
                    name: 'Test',
                    price: 1000,
                });
            };
            const mw = findProductByIdMW(objRepo);
            await mw(req, res, next);
        });
    });

    describe('loadAllProductsMW', () => {
        it('should return products', async () => {
            const req = {};

            const next = (err) => {
                expect(res.locals.products).to.eql([
                    {
                        _id: '5f9e1b9b9b0b3e1e3c4b3b3b',
                        name: 'Test',
                        price: 1000,
                    },
                ]);
            };
            const mw = loadAllProductsMW(objRepo);
            await mw(req, res, next);
        });
    });
});
