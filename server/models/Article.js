import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'general_health',
      'nutrition',
      'fitness',
      'mental_health',
      'chronic_disease',
      'preventive_care',
      'medications',
      'first_aid',
      'women_health',
      'men_health',
      'children_health',
      'senior_health',
      'other'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String
  },
  published: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  references: [{
    title: String,
    url: String
  }],
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }]
}, {
  timestamps: true
});

// Index for search
articleSchema.index({ title: 'text', content: 'text', summary: 'text', tags: 'text' });

const Article = mongoose.model('Article', articleSchema);

export default Article;
