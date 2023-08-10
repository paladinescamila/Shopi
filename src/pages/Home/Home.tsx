import {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Card/Card';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import CheckoutSideMenu from '../../components/CheckoutSideMenu/CheckoutSideMenu';

export default function Home() {
	const [items, setItems] = useState<Product[]>([]);

	useEffect(() => {
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<Layout>
			<div className='grid gap-2 grid-cols-4 w-full max-w-screen-lg'>
				{items?.map((item) => (
					<Card key={item.id} product={item} />
				))}
			</div>
			<ProductDetail />
			<CheckoutSideMenu />
		</Layout>
	);
}
