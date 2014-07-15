var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * About Model
 * ==========
 */

var About = new keystone.List('About', {
    map: { name: 'title' },
    path: 'about-page',
    singular: 'About Page',
    plural: 'About Page',
    label: 'About'
});

About.add({
    title: { type: String, required: true },
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

About.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

About.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
About.register();
