export const FetchCousings = (cousine) => {
    const result = [];

    for (let index = 0; index < cousine.length; index++) {
        const element = cousine[index];
        const menuItem = {
            item_name: element.item_name,
            availability: element.availability,
            popular: element.popular,
            price: element.price,
            special: element.special,
            veg: element.veg,
        };

        result.push(menuItem);
    }

    return result;
};

