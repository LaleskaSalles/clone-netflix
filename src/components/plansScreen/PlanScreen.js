import React, { useEffect, useState } from 'react'
import './PlanScreen.css'
import db from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";


export default function PlanScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsQuery = query(collection(db, "products"), where("active", "==", true));
                const productSnapshots = await getDocs(productsQuery);
                const products = {};

                for (const productDoc of productSnapshots.docs) {
                    products[productDoc.id] = productDoc.data();

                    const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));

                    products[productDoc.id].prices = priceSnap.docs.map((price) => ({
                        priceId: price.id,
                        priceData: price.data(),
                    }));
                }

                setProducts(products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getProducts();
    }, []);


    console.log(products);

    return (
        <div className='plansScreen'>
            {Object.entries(products).map(([productId, productData]) => {
                // logic to check if the user's subscription is active...
                return(
                    <div className='plansScreen_plan'> 
                        <div className='plansSreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>                  
                        <button>Subscribe</button>          
                    </div>
                )
            })}

        </div>
    )
}
