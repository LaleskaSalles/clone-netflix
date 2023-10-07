import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice"
import './PlanScreen.css'
import db, { auth } from '../../firebase';
import { collection, query, where, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { loadStripe } from '@stripe/stripe-js';

export default function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);


    // buscar usuário e inscrição
    useEffect(() => {
        const getSubscriptions = async () => {
            if (user.uid) {
                const ref = collection(db, 'customers', user.uid, 'subscriptions');
                const snapshot = await getDocs(ref);

                if (snapshot.empty) {
                    setSubscription([]);
                } else {
                    const subscriptions = snapshot.docs.map((doc) => doc.data());
                    setSubscription(subscriptions);
                }
            }
        };

        getSubscriptions();
    }, [user.uid, subscription?.role]);


    // buscar e listar planos
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


    // stripe, redirecionar
    const loadCheckout = async (priceId) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
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
                        // Redirect to the Checkout
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

                const productName = productData.name?.toLowerCase();
                let isCurrentPackage = false;

                for (const sub of subscription) {
                    const role = sub.role?.toLowerCase();
                    if (productName && role && productName.includes(role)) {
                        isCurrentPackage = true;
                        break;
                    }
                }

                return (
                    <div
                        key={productId}
                        className={`plansScreen_plan ${!isCurrentPackage ? "plansScreen_plan--active" : ""}`}>
                        <div className='plansSreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button
                            onClick={() => !isCurrentPackage && loadCheckout(productData.prices[0].priceId)}
                        >
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                );

            })}

        </div>
    );




}
