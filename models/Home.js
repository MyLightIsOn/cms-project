var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Home Model
 * ==========
 */

var Home = new keystone.List('Home', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    path: 'home-page',
    singular: 'Home Page',
    plural: 'Home Page',
    label: 'Home'/*,
    nocreate: true,
    nodelete: true*/
});

Home.add({
    title: { type: String, required: true, default: 'Home Page' },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'Admin', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
    /*categories: { type: Types.Relationship, ref: 'PostCategory', many: true }*/
});

Home.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Home.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Home.register();
