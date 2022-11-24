# Rails 7 + Hotwire (Turbo + Stimulus) = Modern web applications

![Screen Shot 2022-10-25 at 08 11 44](https://user-images.githubusercontent.com/156166/197758774-dd969934-1503-432c-b1cd-e71dcc74f5dc.png)

https://medium.com/@raphox/rails-7-hotwire-turbo-stimulus-modern-web-applications-d9dab177bdcb

## Steps used to generate this project:

```
rails new rails-7-fullstack -j esbuild -c tailwind
cd rails-7-fullstack
echo "rails-7-fullstack" > .ruby-gemset
rvm use @rails-7-fullstack
bin/rails d stimulus hello
# Created .editorconfig
rails g scafolld Kit::Product name:string
rails g scaffold Kit::Component product:references name:string
bin/rails db:migrate
# Changed the root route
# Applied Tailwind styles
bundle add simple_form
bin/rails generate simple_form:install
```

## Branchs:

I created different PRs to show the differences during the improviment from Rails' scaffold to a NextJS application as client:

* Hotwire (Turbo): https://github.com/raphox/rails-7-fullstack/pull/1
* Stimulus: https://github.com/raphox/rails-7-fullstack/pull/2
* NextJS: https://github.com/raphox/rails-7-fullstack/pull/3
