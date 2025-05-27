import Article from '../models/Article.js';

// @desc    Get all articles
// @route   GET /api/education/articles
// @access  Public
export const getArticles = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = { published: true };
    if (category) {
      query.category = category;
    }
    
    const articles = await Article.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);
      
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get article by ID
// @route   GET /api/education/articles/:id
// @access  Public
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name')
      .populate('relatedArticles', 'title summary featuredImage');
    
    // Check if article exists
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if article is published or user is author/admin
    if (!article.published && 
        (!req.user || 
         (article.author._id.toString() !== req.user._id.toString() && 
          req.user.role !== 'admin' && 
          req.user.role !== 'doctor'))) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Increment view count
    article.viewCount += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    console.error('Get article by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new article
// @route   POST /api/education/articles
// @access  Private (Admin, Doctor)
export const createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      summary,
      category,
      tags,
      featuredImage,
      published,
      references,
      relatedArticles
    } = req.body;
    
    const article = await Article.create({
      title,
      content,
      summary,
      author: req.user._id,
      category,
      tags,
      featuredImage,
      published: published !== undefined ? published : true,
      references,
      relatedArticles
    });
    
    const populatedArticle = await Article.findById(article._id)
      .populate('author', 'name');
    
    res.status(201).json(populatedArticle);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update an article
// @route   PUT /api/education/articles/:id
// @access  Private (Admin, Doctor)
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    // Check if article exists
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user is author or admin
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }
    
    const {
      title,
      content,
      summary,
      category,
      tags,
      featuredImage,
      published,
      references,
      relatedArticles
    } = req.body;
    
    // Update article fields
    if (title) article.title = title;
    if (content) article.content = content;
    if (summary) article.summary = summary;
    if (category) article.category = category;
    if (tags) article.tags = tags;
    if (featuredImage !== undefined) article.featuredImage = featuredImage;
    if (published !== undefined) article.published = published;
    if (references) article.references = references;
    if (relatedArticles) article.relatedArticles = relatedArticles;
    
    const updatedArticle = await article.save();
    
    const populatedArticle = await Article.findById(updatedArticle._id)
      .populate('author', 'name');
    
    res.json(populatedArticle);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an article
// @route   DELETE /api/education/articles/:id
// @access  Private (Admin, Doctor)
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    // Check if article exists
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user is author or admin
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }
    
    await article.deleteOne();
    
    res.json({ message: 'Article removed' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get article categories
// @route   GET /api/education/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'general_health', name: 'General Health' },
      { id: 'nutrition', name: 'Nutrition' },
      { id: 'fitness', name: 'Fitness' },
      { id: 'mental_health', name: 'Mental Health' },
      { id: 'chronic_disease', name: 'Chronic Disease Management' },
      { id: 'preventive_care', name: 'Preventive Care' },
      { id: 'medications', name: 'Medications' },
      { id: 'first_aid', name: 'First Aid' },
      { id: 'women_health', name: 'Women\'s Health' },
      { id: 'men_health', name: 'Men\'s Health' },
      { id: 'children_health', name: 'Children\'s Health' },
      { id: 'senior_health', name: 'Senior Health' },
      { id: 'other', name: 'Other' }
    ];
    
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Search articles
// @route   GET /api/education/search
// @access  Public
export const searchArticles = async (req, res) => {
  try {
    const { q, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const articles = await Article.find(
      { 
        $text: { $search: q },
        published: true
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('author', 'name')
      .limit(Number(limit))
      .skip(skip);
      
    const total = await Article.countDocuments({ 
      $text: { $search: q },
      published: true
    });
    
    res.json({
      articles,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search articles error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
