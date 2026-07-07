import { ALLOWED_PRODUCT_STATUS, PRODUCT_STATUS_LABEL } from "../config/global.config.js"
const dbGeproductstatus = () => {
    return ALLOWED_PRODUCT_STATUS.map ( (products) => {
        return {
            id : products,
            name : PRODUCT_STATUS_LABEL[products]
        }
    });
}

export default dbGeproductstatus ;
