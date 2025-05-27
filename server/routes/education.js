import express from 'express';
import { 
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories,
  searchArticles
} from '../controllers/educationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Health education routes
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', protect, authorize('admin', 'doctor'), createArticle);
router.put('/articles/:id', protect, authorize('admin', 'doctor'), updateArticle);
router.delete('/articles/:id', protect, authorize('admin', 'doctor'), deleteArticle);
router.get('/categories', getCategories);
router.get('/search', searchArticles);

export default router;
