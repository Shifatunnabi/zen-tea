import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

const blogData = {
  'health-benefits-black-tea': {
    title: 'The Health Benefits of Black Tea: Why It\'s Good for You',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Health & Wellness',
    image: '/placeholder.svg?height=600&width=1200',
    content: `
Black tea is more than just a delicious beverage—it's packed with health benefits that have been recognized for centuries. From ancient traditions to modern science, black tea continues to prove its worth as a wellness powerhouse.

## Rich in Antioxidants

Black tea contains powerful antioxidants called polyphenols, which help protect your cells from damage caused by free radicals. These compounds play a crucial role in maintaining overall health and may reduce the risk of chronic diseases.

## Heart Health Benefits

Regular consumption of black tea has been linked to improved heart health. Studies suggest that drinking black tea can help reduce LDL cholesterol levels, lower blood pressure, and improve blood vessel function—all key factors in cardiovascular wellness.

## Mental Alertness and Focus

The combination of caffeine and L-theanine in black tea provides a unique benefit: enhanced mental alertness without the jitters often associated with coffee. This makes it an excellent choice for maintaining focus throughout the day.

## Supports Digestive Health

Black tea contains tannins that have a therapeutic effect on gastric and intestinal illnesses. The polyphenols in tea may also help maintain a healthy gut microbiome, supporting overall digestive wellness.

## May Support Weight Management

Some research suggests that black tea may help with weight management by promoting fat breakdown and reducing calorie intake. The polyphenols in black tea can boost metabolic rate and increase fat oxidation.

## Authentic Quality Matters

At Zen Tea, we ensure that our black tea retains all these beneficial properties through careful cultivation and processing. Our chemical-free approach preserves the natural compounds that make black tea so beneficial for your health.

Choose Zen Tea for authentic Bangladeshi black tea that supports your wellness journey naturally.
    `,
  },
  'bangladesh-tea-heritage': {
    title: 'The Rich Heritage of Bangladeshi Tea Gardens',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Heritage',
    image: '/placeholder.svg?height=600&width=1200',
    content: `
The tea gardens of Bangladesh are more than agricultural lands—they are living testaments to generations of tradition, craftsmanship, and cultural heritage. Journey with us through the verdant hills of Sylhet, Sreemangal, and Panchagarh.

## The Birthplace of Bangladeshi Tea

Bangladesh's tea heritage dates back to the British colonial era, but it has evolved into something uniquely Bangladeshi. The regions of Sylhet and Sreemangal, often called the "tea capital of Bangladesh," produce some of the world's finest teas.

## The Art of Two Leaves and a Bud

At the heart of quality tea production is the "two leaves and a bud" plucking method. This technique, passed down through generations from mothers to daughters, ensures that only the most tender and flavorful leaves make it into your cup.

## Tea Gardens as Communities

Bangladeshi tea gardens are vibrant communities where families have worked for generations. The knowledge and skill of tea cultivation are precious heirlooms, carefully preserved and transmitted through time.

## Regional Characteristics

### Sylhet
Known for its rolling hills and ideal climate, Sylhet produces teas with robust flavor and excellent color.

### Sreemangal
The "tea capital" offers diverse microclimates that create unique flavor profiles in its teas.

### Panchagarh
This northern region produces teas known for their strength and rich liquor, perfect for milk tea lovers.

## Preserving Tradition in Modern Times

At Zen Tea, we honor this heritage by maintaining traditional methods while ensuring quality and sustainability. Our commitment to authentic Bangladeshi tea means supporting the communities and practices that have made our tea culture world-renowned.

Visit our tea gardens in spirit with every cup of Zen Tea—a connection to Bangladesh's rich tea heritage.
    `,
  },
  'perfect-cup-brewing-guide': {
    title: 'How to Brew the Perfect Cup of Tea: A Complete Guide',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Brewing Tips',
    image: '/placeholder.svg?height=600&width=1200',
    content: `
Brewing the perfect cup of tea is both an art and a science. With the right techniques, you can unlock the full flavor potential of your Zen Tea and enjoy an exceptional tea experience every time.

## Essential Equipment

- **Teapot or cup**: Ceramic or glass is preferred for maintaining temperature
- **Tea strainer**: If using loose leaf tea
- **Kettle**: For heating water to the precise temperature
- **Timer**: For perfect steeping time
- **Quality tea**: Zen Tea, of course!

## The Perfect Brewing Method

### Step 1: Use Fresh, Cold Water
Always start with fresh, cold water. Previously boiled water loses oxygen and can result in flat-tasting tea.

### Step 2: Heat Water to the Right Temperature
For black tea, bring water to a full boil (200-212°F / 93-100°C). This ensures optimal extraction of flavors and beneficial compounds.

### Step 3: Warm Your Teapot
Pour a little hot water into your teapot or cup, swirl it around, and discard. This prevents temperature shock and maintains brewing temperature.

### Step 4: Measure Your Tea
Use approximately 1 teaspoon of loose tea per cup, or one tea bag. Adjust to taste—more for stronger tea, less for milder.

### Step 5: Steep for the Right Time
For Zen Tea black varieties, steep for 3-5 minutes:
- 3 minutes: lighter, more delicate flavor
- 4 minutes: balanced, traditional strength
- 5 minutes: robust, strong liquor

### Step 6: Remove Tea Leaves or Bag
Don't over-steep! Remove the tea leaves or bag after the appropriate time to prevent bitterness.

## Enhancing Your Tea

### Traditional Milk Tea
Add warm milk after brewing for a classic chai experience. Zen Royal Gold Tea is particularly excellent with milk.

### Sweeteners
If desired, add sugar, honey, or your preferred sweetener while the tea is hot for best dissolution.

### Spices
Consider adding cardamom, cinnamon, or ginger for a spiced tea experience.

## Storage Tips

Keep your Zen Tea fresh by storing it in an airtight container in a cool, dry place away from strong odors, light, and moisture.

## Final Thoughts

The perfect cup is ultimately the one you enjoy most. Use these guidelines as a starting point, then adjust to your personal taste preferences. With Zen Tea's premium quality leaves, you're already starting with excellence.

Happy brewing!
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogData[params.slug as keyof typeof blogData]
  
  if (!post) {
    return {
      title: 'Article Not Found - Zen Tea Blog',
    }
  }

  return {
    title: `${post.title} - Zen Tea Blog`,
    description: post.content.substring(0, 160),
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogData[params.slug as keyof typeof blogData]

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted py-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Hero */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Meta Info */}
          <div className="mb-6">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-primary-dark">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta Details */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <button className="ml-auto flex items-center gap-2 text-primary hover:underline">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Featured Image */}
          <div className="mb-12 overflow-hidden rounded-lg">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="mb-4 mt-8 font-serif text-2xl font-bold text-foreground">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="mb-3 mt-6 font-serif text-xl font-bold text-foreground">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              return (
                <p key={idx} className="mb-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border-2 border-primary bg-primary/5 p-8">
            <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
              Experience Zen Tea
            </h3>
            <p className="mb-6 text-muted-foreground">
              Discover our premium tea collection crafted from the finest Bangladeshi tea gardens.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="border-t border-border bg-muted py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(blogData)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 3)
              .map(([slug, relatedPost]) => (
                <Link
                  key={slug}
                  href={`/blogs/${slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card shadow transition-all hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
