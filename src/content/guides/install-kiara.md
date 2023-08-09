---
title: How to install kiara
tags:
  - install
---

## Windows

- Install miniconda https://docs.conda.io/en/latest/miniconda.html#latest-miniconda-installer-links. Latest version. All defaults. No changes
- Set up and launch Jupyter environment: Open Anaconda Prompt, which should be available from your Start menu, then paste each of these commands. A browser window should automatically open when you complete them.

```sh
conda create -n kiara_DHworkshop -c conda-forge python=3.10.11 notebook -y
conda activate kiara_workshop
jupyter notebook
```

- Jupyter notebook
  In the browser you should see Jupyter’s file browser. On the right side of the screen, click the New button and select “Python 3 (ipykernel)”. If a new browser tab or window opens successfully, you’re all done!

## macOS

- Open Terminal. You can find it by clicking Spotlight 🔎 in your menu bar and then typing Terminal. Once Terminal is open,
- Install homebrew: Paste this command into Terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will take some time for the installation to complete

- Install miniconda and git: Paste these two commands into Terminal:

```sh
brew install miniconda git
conda init "$(basename "${SHELL}")"
```

Close the Terminal window and then open a new Terminal window.

- Set up and launch kiara environment: In the new Terminal window, paste the following commands. A browser window should automatically open when you complete them

```sh
conda create -n kiara_workshop -c conda-forge python=3.10 notebook -y
conda activate kiara_workshop
jupyter notebook
```

- Jupyter notebook: In the browser you should see Jupyter’s file browser. On the right side of the screen, click the New button and select “Python 3 (ipykernel)”. If a new browser tab or window opens successfully, you’re all done!

## Workshop demos

Open Anaconda Prompt (Window) or Terminal (macOS) and then paste each of these commands. A browser window should automatically open when you complete them.

```sh
cd Desktop
git clone https://github.com/DHARPA-Project/kiara_plugin.dh_tagung_2023.git
cd kiara_plugin.dh_tagung_2023
conda activate kiara_workshop
```
