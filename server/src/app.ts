import express from 'express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes'
import categoryRoutes from './routes/category.routes';
import recommendationRoutes from './routes/recommendation.routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.get('/', (req, res) => {
  res.send('Yichelo E-commerce API is running');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
