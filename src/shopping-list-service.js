const ShoppingListService = {
    getAllItems(db) {
        return db('shopping_list')
            .select('*')
    },

    insertNewItem(db, newItem) {
        return db('shopping_list')
            .insert(newItem)
            .returning('*')
    },

    getItemByID(db, id) {
        return db('shopping_list')
            .select('*')
            .where('id', id)
    },

    updateItemWithID(db, id, updateItemValues) {
        return db('shopping_list')
            .where('id', id)
            .update(updateItemValues, ['*'])
    },

    deleteItemWithID(db, deleteItemID) {
        return db('shopping_list')
            .where('id', deleteItemID)
            .delete()
    },

    getAllItemsBySearchTerm(db, searchTerm) {
        return db('shopping_list')
            .select('*')
            .where('item_name', 'ilike', `%${searchTerm}%`)
    },

    getAllItemsAndPaginate(db, pageLimit, pageNumber) {
        const offsetNumber = pageLimit * (pageNumber-1)

        return db('shopping_list')
            .select('*')
            .limit(pageLimit)
            .offset(offsetNumber)
    },

    getAllItemsAfterDate(db, daysAgo) {
        return db('shopping_list')
            .select('*')
            .where(
                'date_added',
                '>',
                db.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    },

    getTotalCostForEachCat(db) {
        return db('shopping_list')
            .select('category')
            .sum('price AS total_cost')
            .groupBy('category')
    }
};

module.exports = ShoppingListService;