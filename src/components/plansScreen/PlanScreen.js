import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice"
import './PlanScreen.css'
import db, { auth } from '../../firebase';
import { collection, query, where, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { loadStripe } from '@stripe/stripe-js';

export default function PlanScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser);


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


    const loadCheckout = async (priceId) => {
        const currentUser = auth.currentUser;

        if (currentUser ) {

            await addDoc(collection(db, 'customers', user.uid, 'checkout_sessions'), {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

            onSnapshot(collection(db, 'customers', user.uid, 'checkout_sessions'), (snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                  const { error, sessionId } = doc.data();
            
                  if (error) {
                    alert(`An error occurred: ${error.message}`);
                  }
            
                  if (sessionId) {
                    // Redirecionar para o Checkout
                    const stripe = await loadStripe('pk_test_51NrNjOCfEOrmhZdAs1xQ3Bvadw7kY26md2J3yJzvdPW67rxJR69ej5hkSfpUrh7I9vZz6J0vpgpryVjbXq4wUKWG00lH2swqXr');
                    stripe.redirectToCheckout({ sessionId });
                  }
                });
              });
            } 
            
            };

    return (
        <div className='plansScreen'>
            {Object.entries(products).map(([productId, productData]) => {
                // logic to check if the user's subscription is active...
                return (
                    <div key={productId} className='plansScreen_plan'>
                        <div className='plansSreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices[0].priceId)}>Subscribe</button>
                    </div>
                )
            })}

        </div>
    )


 }
