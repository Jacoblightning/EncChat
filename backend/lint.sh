#!/usr/bin/env bash

uv run mypy --check-untyped-defs --pretty --strict .
