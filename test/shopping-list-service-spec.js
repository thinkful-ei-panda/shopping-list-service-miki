const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');
const { expect } = require('chai');


describe('Shopping items service object', () => {
    let db;

    let testShoppingList = [
        {
            id: 1,
            item_name: 'Fish Tricks',
            price: '13.10',
            date_added: new Date (2020, 06, 15),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            item_name: 'Not Dogs',
            price: '4.99',
            date_added: new Date (2020, 06, 15),
            checked: false,
            category: 'Snack'
        },
        {
            id: 3,
            item_name: 'Bluffalo Wings',
            price: '5.50',
            date_added: new Date (2020, 06, 10),
            checked: false,
            category: 'Snack'
        },
        {
            id: 4,
            item_name: 'Substituna Salad',
            price: '1.24',
            date_added: new Date (2020, 06, 10),
            checked: false,
            category: 'Lunch'
        },
    ];

    before(() => 
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    );

    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());
    after(() => db.destroy());

    // Tests for CRUD & Non-CRUD Methods
    // Because crud, I thought I was suppose to test yesterdays drills
    
    context(`Given 'shopping_list has no data`, () => {
        it('resolves all items', () => {
            return ShoppingListService.getAllItems(db)
                .then(actualData => {
                    expect(actualData).to.eql([])
                });
        });

        it('inserts a new item and resolves with the new item with id', () => {
            const newItem = {
                item_name: 'Tofurkey',
                price: '2.50',
                date_added: new Date (2020, 06, 15),
                checked: false,
                category: 'Breakfast'
            }

            return ShoppingListService.insertNewItem(db, newItem)
                .then(actualData => {
                    newItem.id = 1;
                    newItem.date_added = new Date (actualData[0].date_added);
                    expect(actualData[0]).to.eql(newItem)
                })
        })

    });

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => db('shopping_list').insert(testShoppingList));

        it('resolves all items', () => {
            return ShoppingListService.getAllItems(db)
                .then(actualData => {
                    expect(actualData).to.eql(testShoppingList)
                });
        });

        it('resolves item with matched id', () => {
            return ShoppingListService.getItemByID(db, 4)
                .then(actualData => {
                    expect(actualData[0]).to.eql(testShoppingList[3])
                });
        });

        it('updates item with matched id and resolves with the updated item', () => {
            const updateItemID = 2;
            const updateItemValues = {
                item_name: 'Hopefully Not Dogs',
                price: '5.50',
                date_added: new Date (2020, 06, 15),
                checked: false,
                category: 'Snack'
            }
            return ShoppingListService.updateItemWithID(db, updateItemID, updateItemValues)
                .then(actualData => {
                    updateItemValues.id = actualData[0].id
                    expect(actualData[0]).to.eql(updateItemValues)
                });
        });

        it('deletes item with matched id', () => {
            const deleteItemID = 3;
            return ShoppingListService.deleteItemWithID(db, deleteItemID)
                .then(() => ShoppingListService.getAllItems(db))
                .then(actualData => {
                    const expected = [...testShoppingList];
                    expected.splice(deleteItemID-1, 1)
                    expect(actualData).to.eql(expected)
                });
        });

        it ('resolves all items with names containing search term', () => {
            const searchTerm = 'Fish';
    
            return ShoppingListService.getAllItemsBySearchTerm(db, searchTerm)
                .then(actualData => {
                    expect(actualData[0]).to.eql(testShoppingList[0]);
                });
        });

        it('resolves paginated list of items', () => {
            const pageLimit = 2;
            const pageNumber = 1;

            return ShoppingListService.getAllItemsAndPaginate(db, pageLimit, pageNumber)
                .then(actualData => {
                    expect(actualData).to.eql(testShoppingList.slice(0, 2))
                });
        });

        it('resolves all items after added date', () => {
            const daysAgo = 1;

            return ShoppingListService.getAllItemsAfterDate(db, daysAgo)
                .then(actualData => {
                    expect(actualData).to.eql(testShoppingList.slice(0, 2))
                });
        });
        
        it('resolves total cost for each category', () => {
            const testShoppingListTotalByCategory = [
                {
                    category: 'Lunch',
                    total_cost: '1.24'
                },
                {
                    category: 'Main',
                    total_cost: "13.10"
                },
                {
                    category: 'Snack',
                    total_cost: '10.49'
                } 
            ];

            return ShoppingListService.getTotalCostForEachCat(db)
                .then(actualData => {
                    expect(actualData).to.eql(testShoppingListTotalByCategory)
                });
        });

    });
    
});