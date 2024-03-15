import { getProductVariants } from '../actions/variants'
import PricingDialog from './pricing-dialog'

export default async function Pricing({ company_id, user }: { company_id: any, user: any }) {

    let product_id = process.env.PRODUCT_ID
    let store_id = process.env.STORE_ID

    if (!product_id) {
        throw new Error('No product ID found')
    }

    //  Call getProductVariants with the .env product_id, so we can have data for all the variants of a product
    const productVariants = await getProductVariants(product_id)

    

    return (
        <>
            <PricingDialog productVariants={productVariants} company_id={company_id} user={user} store_id={store_id} />
        </>
    )
}