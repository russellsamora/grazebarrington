PHONY: github

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	cp CNAME docs/
	git add -A
	git commit -m "update github pages"
	git push

update:
	npm run gdoc
	npm run build
	make github