import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config"; 

export const useCollectionsData = () => {
    const [data, setData] = useState({
        balance: { current: 0, income: 0, expenses: 0 },
        budgets: [],
        pots: [],
        transactions: []
    });
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {   
        async function fetchMultipleCollections() {
            setIsPending(true);
            setError(null);
            try {
                const balanceDoc = await getDoc(doc(db, "balance", "current"));
                const balanceData = balanceDoc.exists() ? balanceDoc.data() : { 
                    current: 0, 
                    income: 0, 
                    expenses: 0 
                };

                const [budgetsSnap, potsSnap, transactionsSnap] = await Promise.all([
                    getDocs(collection(db, "budgets")),
                    getDocs(collection(db, "pots")),
                    getDocs(collection(db, "transactions"))
                ]);

                setData({
                    balance: balanceData,
                    budgets: budgetsSnap.docs.map((doc) => ({ 
                        id: doc.id, 
                        ...doc.data(),
                        spent: 0, 
                        limit: doc.data().maximum 
                    })),
                    pots: potsSnap.docs.map((doc) => ({ 
                        id: doc.id, 
                        ...doc.data(),
                        amount: doc.data().total 
                    })),
                    transactions: transactionsSnap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        type: doc.data().amount >= 0 ? "income" : "expense"
                    }))
                });
                console.log("Fetched data successfully", {
                    balanceData,
                    budgets: budgetsSnap.docs.map((d) => d.data()),
                    pots: potsSnap.docs.map((d) => d.data()),
                    transactions: transactionsSnap.docs.map((d) => d.data())
                });
                

            } catch (err) {
                console.error("Error fetching collections:", err);
                setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
            } finally {
                setIsPending(false);
            }
        }

        fetchMultipleCollections();
    }, []);


    return { data, isPending, error };
};

