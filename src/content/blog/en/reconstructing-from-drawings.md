---
translationKey: reconstructing-from-drawings
locale: en
title: "Reconstructing the engine from scanned drawings"
description: "How can a drawing become a model without losing its uncertainties? This reconstruction plan keeps source information, interpretation, and geometry connected."
pubDate: "2026-10-03"
tags: ["design", "cad"]
heroImage: "../../../assets/illustrations/source-to-cad.svg"
heroAlt: "A source-like drawing on a grid beside a conceptual geometric model, linked by an arrow."
heroCaption: "Conceptual schematic. 01 — source-like sketch; 02 — interpreted geometry. No original scan or completed CAD reconstruction is shown."
status: editorial-preview
---

## The question behind the model

The planned reconstruction begins with a simple question: how can a drawing become useful geometry while preserving the information that remains uncertain? A clean model is easy to present. Explaining which features came from the source and which were interpreted will take more deliberate work.

No original scans or completed CAD model are available in this first edition. The comparison above is a conceptual illustration of the workflow. It outlines the kind of evidence I want a future reconstruction article to contain.

The objective will be to create an inspectable model and a readable record of its assumptions together. That record should make it possible to return to a feature later and understand why it has its current shape.

## A proposed reconstruction workflow

I plan to begin by identifying the source files, their versions, and the relevant sheets or sections. Before modelling a part, I want to record which views describe it and which dimensions or notes are actually legible. An unclear detail should be logged as a question at that stage.

The next step will be to define the model's coordinate system and the interfaces needed for an initial assembly. Each reconstructed feature can then carry a short note identifying its source and any interpretation. Where information conflicts, I want the conflict recorded alongside the candidate choices, rather than quietly resolved in the model.

The work can progress through small, reviewable changes. An individual update should explain its scope: perhaps a single feature, a relationship between two parts, or a correction to the way a view was interpreted. Keeping those changes narrow will help the article tell one coherent story.

## What the comparison is meant to show

Callout 01 marks a stylized drawing on a grid. The grid is a visual device; it does not provide a measurement scale. Callout 02 marks a schematic geometric reconstruction. The arrow represents the act of interpretation, including the questions that need to be answered between the two views.

When actual material is available, I want to show equivalent views with annotations describing the feature under discussion. The caption should identify the source location and the model revision. If a comparison depends on an assumed orientation or alignment, that should be stated as well.

A future model image will provide evidence of geometry being created. Its caption will also need to describe the checks performed, because the image alone cannot establish how accurately a source was interpreted.

## Questions that remain unresolved

What is the most useful source set to start with? Are the relevant dimensions and notes readable? How should discrepancies between different views be recorded? Which assembly relationships can be established directly, and which will remain provisional?

There is also a practical question about publication: which excerpts can be shared, and how should their source be credited? That needs to be settled before replacing the conceptual sketch with a real source image.

## Evidence for the next iteration

The first reconstruction update should include a source locator, an annotated model view, and a concise assumptions list. It should describe what was built, what was checked, and which decisions remain open. Downloadable geometry can follow when it is tied to an actual revision and a clear description of its scope.

The related [combustor and fuel-routing investigation](../combustor-and-fuel-routing/) will use the same habit: show the question, identify the proposed change, and keep the evidence attached to the configuration under discussion.
