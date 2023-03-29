var testProducts = [
    {
        id: 1,
        name: 'Termék 1',
        price: 1000,
        description: 'Ez a termék 1',
        location: 'Budapest',
        customer: undefined,
    },
    {
        id: 2,
        name: 'Tank',
        price: 2000,
        description: 'Nagyon modern és szuperrrr',
        location: 'Budapest',
        customer: 1,
    },
];

var testCustomers = [
    {
        id: 1,
        name: 'Teszt Elek',
        email: 'elek@teszt.hu',
        products: [1, 2],
        joined: '2019-01-01',
    },
    {
        id: 2,
        name: 'Teszt Alma',
        email: 'alma@joooo.xom',
        products: [3],
        joined: '2014-01-01',
    },
];

module.exports = {
    testProducts,
    testCustomers,
};
