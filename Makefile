run:
	docker run -d -p 3000:3000 --rm --name logsapp logsapp:example
stop:
	docker stop logsapp