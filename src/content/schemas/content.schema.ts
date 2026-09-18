import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Content extends Document {
  @Prop({ default: 'Office: E-285, Terrace Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi' })
  address: string;

  @Prop({ default: 'info@divinecreations.com' })
  email: string;

  @Prop({ default: '+91 98110 66081' })
  phone: string;

  @Prop({ default: 'Quality is a Culture, Service a Tradition' })
  storyTitle: string;

  @Prop({
    default:
      'Established in 2007 under the guidance of Mrs. Vibha Ahuja and JagMohan Ahuja (President), Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Notebooks, Drinkware, Trophies, Wall Clocks, and Barware in New Delhi.',
  })
  storyText1: string;

  @Prop({
    default:
      'Our state-of-the-art facility at Badli Industrial Estate features Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving. Managed by Mohit Ahuja (Sales), Avichal Aurora (Exports), and Vibha Ahuja (Customer Care), we ensure flawless custom branding and fulfillment.',
  })
  storyText2: string;

  @Prop({ default: 'Our Products' })
  ourProductsTitle: string;

  @Prop({ default: 'The quality, custom laser engraving, and prompt delivery of our executive corporate gift sets exceeded our expectations. Truly a trusted corporate gifting partner!' })
  clientQuote: string;

  @Prop({ default: 'DIVINE CREATIONS CLIENT' })
  clientQuoteAuthor: string;

  @Prop({ default: '' })
  clientQuoteImage: string;

  @Prop({ type: Array, default: [] })
  projects: Array<any>;

  @Prop({ type: Array, default: [] })
  blogs: Array<any>;

  @Prop({
    type: Object,
    default: {
      home: {
        title: 'Corporate & Promotional Gift Items',
        subtitle: 'Trusted Manufacturer, Trader & Exporter of Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions in New Delhi',
        image: '',
        mobileImage: ''
      },
      about: {
        title: 'About Divine Creations',
        subtitle: 'Leading Firm Engaged in Manufacturing, Trading & Exporting Corporate & Promotional Gift Items Since 2007',
        image: '',
        mobileImage: ''
      },
      collections: {
        title: 'Corporate and Promotional Gift Items',
        subtitle: 'Explore Our Complete Catalog of Executive Gift Sets, Stainless Steel Vacuum Flasks, Trophies, Wall Clocks & Customized Items',
        image: '',
        mobileImage: ''
      },
      customOrder: {
        title: 'Bespoke Corporate Solutions & Custom Branding',
        subtitle: 'Transform Your Corporate Vision Into Visual Impact with Direct Factory Customization & Packaging',
        image: '',
        mobileImage: ''
      },
      gallery: {
        title: 'Divine Creations Craft Gallery',
        subtitle: 'Visual Showcase of Precision Laser Engraved Drinkware, Executive Notebooks, Award Trophies & Custom Packaging',
        image: '',
        mobileImage: ''
      },
      blogs: {
        title: 'Our Blogs & Corporate Gifting Insights',
        subtitle: 'Discover Expert Insights, Corporate Gifting Trends & Custom Branding Strategies from Divine Creations',
        image: '',
        mobileImage: ''
      },
      clients: {
        title: 'Our Esteemed Corporate Clients',
        subtitle: 'Trusted by Government Ministries, Multinationals & Leading Enterprises Across India and Abroad',
        image: '',
        mobileImage: ''
      },
      contact: {
        title: 'Contact Divine Creations',
        subtitle: 'Visit Our Office in Naraina Vihar or Connect with Our Executive Sales Team for Customized Corporate Quotes',
        image: '',
        mobileImage: ''
      }
    }
  })
  pageHeroes: Record<string, { title: string; subtitle: string; image: string; mobileImage: string }>;

  @Prop({
    type: Object,
    default: {
      overview: {
        badge: 'ABOUT DIVINE CREATIONS',
        title: 'Traditional Indian Craftsmanship',
        titleHighlight: 'Modern Design',
        description:
          'Established in 2007 in New Delhi under Director M Ahuja, Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Gift Sets, Stainless Steel Flasks, Executive Notebooks, Trophy Mementos, and Custom Homeware.',
        image: '/uploads/about_corporate_gifting_craft.jpg',
        buttonText: 'KNOW OUR STORY',
        buttonLink: '/about',
        highlights: [
          { title: '16+ Years', subtitle: 'Experience', icon: 'clock' },
          { title: 'GST Registered', subtitle: 'Proprietorship', icon: 'shield' },
          { title: 'Trusted', subtitle: 'Manufacturer', icon: 'users' },
          { title: 'Corporate', subtitle: 'Gifting Sets', icon: 'gift' },
        ],
      },
      manufacturing: {
        badge: 'ADVANCED MANUFACTURING & BRANDING',
        title: 'Precision Branding',
        titleSub: 'For Corporate Gifts',
        description:
          'Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.',
        buttonText: 'SEE OUR PROCESS',
        buttonLink: '/custom-order',
        cards: [
          {
            tag: 'Fiber Laser Marking',
            title: 'Custom Laser Engraved Bottles',
            linkText: 'Click to View Catalog →',
            category: 'Drinkware',
            image: '/uploads/laser_engraving_corporate_gifting.jpg',
          },
          {
            tag: '',
            title: 'Metal Trophies',
            linkText: 'View Items →',
            category: 'Mementos & Trophies',
            image: '/uploads/metal_etching_trophy_crafting.jpg',
          },
          {
            tag: '',
            title: 'Leatherette Diaries',
            linkText: 'View Items →',
            category: 'Gift Sets & Notebooks',
            image: '/uploads/leatherette_gifting_embossing.jpg',
          },
          {
            tag: 'Executive Gift Combo',
            title: 'Corporate Gift Sets',
            linkText: 'Click to View Catalog →',
            category: 'Corporate Gifts',
            image: '/uploads/executive_drinkware_set.jpg',
          },
        ],
      },
    },
  })
  about: any;

  @Prop({
    type: Object,
    default: {
      facebook: '',
      instagram: '',
      youtube: '',
      whatsapp: '',
      whatsappNumber: '',
    },
  })
  socialLinks: Record<string, string>;

  @Prop({ default: 'Trusted by Businesses Across India' })
  trustedBrandsTitle: string;

  @Prop({ default: 'Businesses' })
  trustedBrandsHighlight: string;

  @Prop({ default: '' })
  trustedBrandsSubtitle: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

