import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";

type Category = "Phones" | "Laptops";

type Product = {
    id: number,
    name: string,
    category: Category,
    price: number,
    description: string
}

const ProductsPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleGoToMainPage = () => {
        navigate('/');
    }


    const ProductReturner = (): Product[] => {
        if (searchParams.get("category") === "phones") {
            const phones: Product[] = products.filter((value) => value.category === "Phones");
            return phones;
        }
        else if (searchParams.get("category") === "laptops") {
            const laptops: Product[] = products.filter((value) => value.category === "Laptops");
            return laptops;
        }
        return products;
    }

    const products: Product[] = [
        { id: 1, name: 'Ноутбук Lenovo IdeaPad', price: 19699, category: 'Laptops', description: `Ноутбук Lenovo IdeaPad 1 15AMN7 (82VG00R2US) Cloud Grey / 15.6" IPS / AMD Ryzen 3 7320U / RAM 4 ГБ / SSD 128 ГБ` },
        { id: 2, name: 'Мобільний телефон Samsung Galaxy', price: 34999, category: "Phones", description: `Мобільний телефон Samsung Galaxy S26 FE 5G 8/128GB Graphite (SM-S741BZKDEUC)` },
        { id: 3, name: 'Смартфон Samsung Galaxy A57', price: 22799, category: 'Phones', description: `Смартфон Samsung Galaxy A57 8/128Gb Awesome Navy (SM-A576BDBBEUC)` },
        { id: 4, name: "SAMSUNG Galaxy A17", price: 13999, category: "Phones", description: `SAMSUNG Galaxy A17 SM-A175F 8/256GB Dual Sim Gray (SM-A175FZAEEUC)` },
        { id: 5, name: "Смартфон Samsung Galaxy A08", price: 10699, category: "Phones", description: `Смартфон Samsung Galaxy A08 4/128Gb Dark Blue (SM-A085FDBGSEK)` },
        { id: 6, name: `Ноутбук 14" Lenovo IdeaPad Slim 3`, price: 19799, category: "Laptops", description: `Ноутбук 14" Lenovo IdeaPad Slim 3 Chrome 14IAN8 Intel Core i3-N305 RAM 8GB eMMC 256GB 11год батарея Chrome OS (UKR)` },
        { id: 7, name: `Ноутбук Dell Inspiron`, price: 29999, category: "Laptops", description: `Ноутбук Dell Inspiron 15,6 AMD Ryzen 7 7730U 16Gb/512Gb (LDC15255-A117BLK-PUS) Carbon Black (Відновлений, Ідеальний стан)` }
    ];

    if (id) {
        let true_id = Number(id) - 1;

        if (true_id >= 0 && true_id < products.length) {



            const handleShopbutton = () => {
                navigate("/products")
            }

            return (
                <main className="grow max-w-7xl w-full mx-auto px-6 py-10">
                    <button onClick={handleShopbutton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go to ShopPage
                    </button>
                    <div className="animate-fade-in flex flex-col h-full justify-between">
                        <div>
                            {/* Зображення товару */}
                            <div className="w-full h-56 bg-indigo-100 rounded-xl mb-6 flex items-center justify-center text-indigo-400 font-bold">
                                Велике фото товару
                            </div>

                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                                        {products[true_id].category}
                            </span>

                            {/* Назва та ціна */}
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-2xl font-bold text-gray-900">{products[true_id].name}#{id}</h2>
                                <span className="text-xl font-black text-indigo-600">{products[true_id].price} ₴</span>
                            </div>

                            {/* Опис */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                {products[true_id].description}
                            </p>
                        </div>

                        {/* Кнопка дії */}
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                            Додати до кошика
                        </button>
                    </div>
                </main>
            )
        }
        else {
            return <Navigate to={"/products"} replace/>
        }
    }

    return (

        <div>
            <main className="grow max-w-7xl w-full mx-auto px-6 py-10">
                <button onClick={handleGoToMainPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to MainPage
                </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Каталог товарів</h1>
                    <p className="text-gray-600 mt-1">Оберіть товар зі списку, щоб переглянути деталі.</p>
                    <div className="flex flex-row gap-1">
                        <button className="rounded-2xl bg-blue-500 text-white pt-0.5 pb-0.5 pr-2 pl-2 border-2 border-blue-500 hover:bg-white hover:text-blue-500 cursor-pointer select-none" onClick={() => setSearchParams("")}>All</button>
                        <button className="rounded-2xl bg-blue-500 text-white pt-0.5 pb-0.5 pr-2 pl-2 border-2 border-blue-500 hover:bg-white hover:text-blue-500 cursor-pointer select-none" onClick={() => setSearchParams({ "category": "phones" })}>Phones</button>
                        <button className="rounded-2xl bg-blue-500 text-white pt-0.5 pb-0.5 pr-2 pl-2 border-2 border-blue-500 hover:bg-white hover:text-blue-500 cursor-pointer select-none" onClick={() => setSearchParams({ "category": "laptops" })}>Laptops</button>
                    </div>
                </div>

                <div>

                    {/* ПЕРША ЧАСТИНА: Список карток (7 колонок) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {ProductReturner().map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between group"
                                state={product}
                            >
                                <div>
                                    <div className="w-full h-40 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-indigo-300 font-bold">
                                        Фото
                                    </div>
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    <h3 className="font-bold text-gray-900 mt-2 group-hover:text-indigo-600 transition-colors text-xs">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs font-black text-gray-900">{product.price} ₴</span>
                                    <span className="text-xs font-medium text-indigo-600">Детальніше &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </main>

        </div>
    )
}

export default ProductsPage;