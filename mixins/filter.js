var filterFunctions = {
    filter(collection, listOfCritieriums) {
        let result = collection;
        result = _.filter(result, el => {
            let show = false;
            _.each(listOfCritieriums, cr => {
                const fieldValue = _.get(el, "fields." + cr.filterName);
                if (cr.filterName == 'type') {
                    if (isNaN(fieldValue) && fieldValue.includes(cr.value.label)) {
                        console.log('type f')
                        show = true;
                    }
                }
            })
            return show;
        });
        return result;
    }
}

export default filterFunctions;
