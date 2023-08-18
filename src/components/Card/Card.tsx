import React from 'react';
import {PlusIcon, CheckIcon, HeartIcon as SolidHeartIcon} from '@heroicons/react/24/solid';
import {HeartIcon} from '@heroicons/react/24/outline';
import {useShopiContext} from '../../context';
import {useResponsive} from '../../utils';

interface Props {
	product: Product;
}

export default function Card(props: Props) {
	const {title, image, price, category} = props.product;
	const {
		productToShow,
		openProductDetail,
		closeProductDetail,
		cartProducts,
		addToCart,
		removeFromCart,
		openCheckoutSideMenu,
		categories,
		favorites,
		addFavorite,
		removeFavorite,
	} = useShopiContext();
	const productWasAdded = cartProducts.find((product) => product.id === props.product.id);
	const productIsSelected = productToShow?.id === props.product.id;
	const productIsFavorite = favorites.includes(props.product);

	const openProduct = () => {
		closeProductDetail();

		if (!productIsSelected) {
			setTimeout(() => {
				openProductDetail(props.product);
			}, 300);
		}
	};

	const addOrRemoveToCart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();

		if (productWasAdded) removeFromCart(props.product);
		else {
			addToCart(props.product);
			openCheckoutSideMenu();
		}
	};

	const {isDesktop} = useResponsive();
	const categoryNumber = categories[props.product.category].colorIndex + 1;

	return (
		<div
			className={`cursor-pointer w-60 border transition-all duration-300 group p-2 ${
				productIsSelected
					? 'border-black'
					: ' border-l-gray-100 border-r-gray-300 border-t-gray-100 border-b-gray-300'
			}`}
			onClick={openProduct}>
			<figure className='relative mb-2'>
				<span
					className={`absolute bottom-0 left-0 text-xs m-2 px-2 py-0.5 rounded-full category-${categoryNumber}`}>
					{categories[category].name}
				</span>
				<div className='flex justify-center items-center w-full h-60 p-1'>
					<img src={image} alt={title} className='max-w-full max-h-full' />
				</div>
				<div
					className={`absolute top-0 left-0 p-1 ${
						productIsFavorite ? 'flex' : isDesktop ? 'hidden group-hover:flex' : 'flex'
					}`}>
					{productIsFavorite ? (
						<SolidHeartIcon
							className='h-6 w-6 text-red-500'
							onClick={(event) => {
								event.stopPropagation();
								removeFavorite(props.product);
							}}
						/>
					) : (
						<HeartIcon
							className='h-6 w-6 text-black'
							onClick={(event) => {
								event.stopPropagation();
								addFavorite(props.product);
							}}
						/>
					)}
				</div>
				<div
					className={`absolute top-0 right-0 border border-gray-300 ${
						productWasAdded ? 'flex' : isDesktop ? 'hidden' : 'flex'
					} justify-center items-center h-6 cursor-pointer group-hover:flex ${
						productWasAdded ? 'bg-black' : 'bg-white'
					}`}
					onClick={addOrRemoveToCart}>
					{productWasAdded ? null : (
						<p className={`text-sm font-light mx-1 ${isDesktop ? 'flex' : 'hidden'}`}>
							Add to cart
						</p>
					)}
					{productWasAdded ? (
						<CheckIcon className='h-6 w-6 text-white' />
					) : (
						<PlusIcon className='h-6 w-6 text-black' />
					)}
				</div>
			</figure>
			<p className={`flex justify-between gap-2`}>
				<span className='text-sm font-light'>{title}</span>
				<span className='text-sm font-medium'>${price}</span>
			</p>
		</div>
	);
}
