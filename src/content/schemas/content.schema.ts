import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Content extends Document {
  @Prop({ default: 'Showroom: E-285, 1st Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi' })
  address: string;

  @Prop({ default: 'info@divinecreations.com' })
  email: string;

  @Prop({ default: '+91 85068 65563' })
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
        subtitle: 'Visit Our Showroom in Naraina Vihar or Connect with Our Executive Sales Team for Customized Corporate Quotes',
        image: '',
        mobileImage: ''
      }
    }
  })
  pageHeroes: Record<string, { title: string; subtitle: string; image: string; mobileImage: string }>;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
